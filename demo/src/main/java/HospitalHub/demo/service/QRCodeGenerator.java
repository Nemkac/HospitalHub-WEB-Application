package HospitalHub.demo.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

import static com.google.zxing.client.j2se.MatrixToImageWriter.writeToStream;

public class QRCodeGenerator {

    public static File generateQRCodeImage(String text, int width, int height) throws WriterException, IOException {

        QRCodeWriter qrCodeWriter = new QRCodeWriter();

        BitMatrix matrix =  qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        File qrImg = new File("QRIMG.png");
        BufferedImage bfi = MatrixToImageWriter.toBufferedImage(matrix);
        ImageIO.write(bfi, "PNG", qrImg);

        return qrImg;
    }

}
