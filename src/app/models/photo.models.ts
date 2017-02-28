export class Photo {
     id : number;
     title : string;
     category : Category;
}

export class Category {
     id : number;
     name : string;
     image: string;
     photos: string[];
}