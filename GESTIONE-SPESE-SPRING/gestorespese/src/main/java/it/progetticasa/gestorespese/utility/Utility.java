package it.progetticasa.gestorespese.utility;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import it.progetticasa.gestorespese.dto.SpesaDto;

public class Utility {
	public static List<SpesaDto> elaboraSpese(MultipartFile file) throws Exception{
		List<SpesaDto> spese = new ArrayList<SpesaDto>();
		
		try(Workbook workbook = new XSSFWorkbook(file.getInputStream())){
			Sheet sheet = workbook.getSheetAt(0);

			for (Row row : sheet) {
				if(!isRowEmpty(row) && row.getRowNum()>0) {
					SpesaDto spesa = new SpesaDto();
					
					Cell dataContabileCell = row.getCell(0);

					if(dataContabileCell != null && dataContabileCell.getCellType() == dataContabileCell.getCellTypeEnum().STRING.getCode()) {
						if(dataContabileCell != null 
								&& !Utility.isBlankOrNull(dataContabileCell.getStringCellValue()) ) {
							spesa.setDataContabile(convertDate(dataContabileCell.getStringCellValue()));
						}
					}
					if(dataContabileCell != null && dataContabileCell.getCellType() == dataContabileCell.getCellTypeEnum().NUMERIC.getCode()) {
						if(dataContabileCell != null 
								&& !Utility.isBlankOrNull(dataContabileCell.getNumericCellValue()) ) {
							spesa.setDataContabile(convertDate(dataContabileCell.getDateCellValue()));
						}
					}
					
					Cell dataValutaCell = row.getCell(1);

					if(dataValutaCell != null && dataValutaCell.getCellType() == dataValutaCell.getCellTypeEnum().STRING.getCode()) {
						if(dataValutaCell != null 
								&& !Utility.isBlankOrNull(dataValutaCell.getStringCellValue()) ) {
							spesa.setDataValuta(convertDate(dataValutaCell.getStringCellValue()));
						}
					}
					if(dataValutaCell != null && dataValutaCell.getCellType() == dataValutaCell.getCellTypeEnum().NUMERIC.getCode()) {
						if(dataValutaCell != null 
								&& !Utility.isBlankOrNull(dataValutaCell.getNumericCellValue()) ) {
							spesa.setDataValuta(convertDate(dataValutaCell.getDateCellValue()));
						}
					}
					Cell descrizioneCell = row.getCell(2);
					if(descrizioneCell != null 
							&& !Utility.isBlankOrNull(descrizioneCell.getStringCellValue()) ) {
						spesa.setDescrizione(descrizioneCell.getStringCellValue());
					}
					Cell entrateCell = row.getCell(3);
					if(entrateCell != null 
							&& !Utility.isBlankOrNull(entrateCell.getNumericCellValue()) ) {
						spesa.setEntrate(entrateCell.getNumericCellValue());
					}
					Cell usciteCell = row.getCell(4);
					if(usciteCell != null 
							&& !Utility.isBlankOrNull(usciteCell.getNumericCellValue()) ) {
						spesa.setUscite(usciteCell.getNumericCellValue());
					}
					Cell descrizioneEstesaCell = row.getCell(5);
					if(descrizioneEstesaCell != null 
							&& !Utility.isBlankOrNull(descrizioneEstesaCell.getStringCellValue()) ) {
						spesa.setDescrizioneEstesa(descrizioneEstesaCell.getStringCellValue());
					}
					
					spese.add(spesa);
				}
			}
		}
		
		return spese;
	}
	
	public static Boolean isBlankOrNull(Object obj) {
		return obj == null || obj.toString().equalsIgnoreCase("");
	}
	
	public static java.sql.Date convertDate(String dateFrom) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yy");
	    return new java.sql.Date(sdf.parse(dateFrom).getTime());
	}
	
	public static java.sql.Date convertDate(Date dateFrom) throws ParseException{
	    return new java.sql.Date(dateFrom.getTime());
	}
	
	public static boolean isRowEmpty(Row row) {
	    for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
	        Cell cell = row.getCell(c);
	        if (cell != null && cell.getCellType() != Cell.CELL_TYPE_BLANK)
	            return false;
	    }
	    return true;
	}
	
	public static Date getNow() {
		Calendar today = Calendar.getInstance();
		today.set(Calendar.HOUR_OF_DAY, 0);
		return today.getTime();
	}
	
	public static java.sql.Date getNowSql() {
		Calendar today = Calendar.getInstance();
		today.set(Calendar.HOUR_OF_DAY, 0);
		return convertUtilToSql(today.getTime());
	}
	
	public static java.sql.Date convertUtilToSql(java.util.Date uDate) {
        java.sql.Date sDate = new java.sql.Date(uDate.getTime());
        return sDate;
    }

	public static Boolean beforeOrEquals(Date data1, Date data2) {
		return !getZeroTimeDate(data2).after(getZeroTimeDate(data1));
	}
	public static Boolean afterOrEquals(Date data1, Date data2) {
		return !getZeroTimeDate(data2).before(getZeroTimeDate(data1));
	}
	private static Date getZeroTimeDate(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		date = calendar.getTime();
		return date;
	}
}
