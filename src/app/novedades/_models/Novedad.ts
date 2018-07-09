export class Novedad {
    id: number;
    titulo: string;
    contenido: string;
    imagePath: string;
    image: any;
    esPrioritaria: boolean;

    fillFromJson(json): void {
        this.id = json.id;
        this.titulo = json.titulo;
        this.contenido = json.contenido;
        this.imagePath = json.image_path;
        this.esPrioritaria = Boolean(json.es_prioritaria);
    }
}
