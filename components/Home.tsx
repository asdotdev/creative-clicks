import Camera from "@/components/Camera";
import Preview from "@/components/Preview";
import { PreviewProvider } from "@/contexts/PreviewContext";
import { Photo } from "@/interface";
import { useState } from "react";

export default function Home() {
    const [photo, setPhoto] = useState<Photo | null>(null);

    const savePhoto = (obj: Photo) => setPhoto(obj);

    const deletePhoto = () => setPhoto(null);

    return photo ? (
        <PreviewProvider>
            <Preview photo={photo} deletePhoto={deletePhoto} />
        </PreviewProvider>
    ) : (
        <Camera savePhoto={savePhoto} />
    );
}
