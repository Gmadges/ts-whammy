interface IFromImageArrayOptions {
    fps?: number;
    duration?: number;
    outputAsArray?: boolean;
}
declare const _default: {
    fromImageArray(images: string[], fps: number, outputAsArray?: boolean | undefined): Uint8Array | Blob;
    fromImageArrayWithOptions(images: string[], options?: IFromImageArrayOptions): Uint8Array | Blob;
};
export default _default;
