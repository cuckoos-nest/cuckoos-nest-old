export class Photo {
     id : number;
     title : string;
     image : any;
     category : Category;
}

export class Category {
     id : number;
     name : string;
     image: string;
     photos: string[];
}