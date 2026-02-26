import Image, { ImageProps } from 'next/image';
import { cn } from '../../lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
    src?: string | null;
    fallbackText?: string;
}

export default function OptimizedImage({
    src,
    alt,
    className,
    ...props
}: OptimizedImageProps) {

    if (!src) {
        return (
            <div className={cn("flex flex-col items-center justify-center bg-zinc-800/30 gap-2 opacity-20", className)}>
                <div className="w-12 h-12 border-2 border-dashed border-zinc-500 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold">?</span>
                </div>
                <span className="text-zinc-500 text-[10px] font-medium uppercase tracking-widest">Sin imagen</span>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            <Image
                src={src}
                alt={alt || 'Product image'}
                className={cn("object-cover", className)}
                {...props}
            />
        </div>
    );
}
