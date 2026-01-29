export interface StateType {
    app:{
        darkMode:boolean,
        quiz:QuestionType[],
        score:number
    }
}

export interface QuestionType {
    id:number,
    question:string,
    answer:string,
    hints:string[],
    poster:string
}