export class Photo {
    public id : number;
    public title : string;
    public image : any;
    public category : Category;
}

export class Category {
    public id : number;
    public name : string;
}