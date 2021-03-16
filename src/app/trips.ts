
export class Trip{
    key: any;
    name: string;
    country: string;
    start_date: Date;
    end_date: Date;
    price: number;
    capacity: number;
    description: string;
    img_link: string;
    reserverdSeats: number;
    evaluation: number;

    constructor(
        key: string|null,
        name: string,
        country: string,
        start_date: Date,
        end_date: Date,
        price: number,
        capacity: number,
        description: string,
        img_link: string
    
    ) {
        this.key = key;
        this.name = name ;
        this.country = country ;
        this.start_date= start_date ;
        this.end_date = end_date ;
        this.price= price ;
        this.capacity=capacity ;
        this.description=description;
        this.img_link= img_link;
        this.reserverdSeats = 0; //wartość domyślna, zawsze na początku 0
        this.evaluation = 0; //wartość domyślna, zawsze na początku 0
    }

    get freeSeats() {
        return this.capacity - this.reserverdSeats;
    }
}
