import imageCompression from 'browser-image-compression';

export async function compressAndConvertToWebP(file: File): Promise<File> {
    // Configuración para la compresión y conversión
    const options = {
        maxSizeMB: 1,            // Tamaño máximo de 1MB
        maxWidthOrHeight: 1200,   // Redimensionar si es más grande
        useWebWorker: true,
        fileType: 'image/webp', // Convertir a WebP
    };

    try {
        const compressedFile = await imageCompression(file, options);

        // El nombre del archivo debe terminar en .webp para ser consistente
        const fileName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        const webpFileName = `${fileName}.webp`;

        // Crear un nuevo objeto File con el nombre .webp corregido
        return new File([compressedFile], webpFileName, {
            type: 'image/webp',
            lastModified: Date.now()
        });
    } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        return file; // Si falla, devolvemos el original
    }
}
