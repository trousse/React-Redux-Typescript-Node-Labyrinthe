interface IlabObserver{
    onGridChanged: ( grid: CaseProps[][] ) => void;
    onAsigned: (room:string)=>void;
}

export default IlabObserver;