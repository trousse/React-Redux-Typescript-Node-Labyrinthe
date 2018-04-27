import {IcaseProps} from './Props'

interface IlabObserver{
    onGridChanged: ( grid: IcaseProps[][] ) => void;
    onAsigned: (room:string)=>void;
}

export default IlabObserver;