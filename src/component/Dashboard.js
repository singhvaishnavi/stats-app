import '.././App.css';
import {useState, useEffect} from 'react';
import data1 from '../constants/data1.json';
import data2 from '../constants/data2.json';
import data3 from '../constants/data3.json';
import data4 from '../constants/data4.json';


function Dashboard() {
    const [mean, setMean] = useState(0);
    const [median, setMedian] = useState(0);
    const [mode, setMode] = useState(0);
    const [sd, setSd] = useState(0);
    const [num, setNum] = useState(0);
    const [dataSet,setDataSet] =useState();
    const [dataSetName, setDataSetName] = useState("");
 
    useEffect(() => {
        setDataSet(data1);
      },[]);

    const handleAddition = () =>{
        if(isNaN(num))
        {
            alert("Please enter a numeric value");
        }else{
            for(let i=0;i<dataSet.data.length;i++){
                dataSet.data[i]+=parseInt(num);
            }
            handleData();
        }
    }
    const loadNewDataset = () => {
        const dataSets = [data1, data2, data3, data4];
        const index =  Math.floor(Math.random() * 4);
        setDataSet(dataSets[index]);
        setDataSetName(("Data Set: data"+(index+1)+".json"));
        handleData();
    }
    const handleData = () =>{
        dataSet.data=dataSet.data.sort();
        var sum=0;
        var med; var index; var sdTemp;
        var ctr=0; var ctrMax=0; var modeTemp;
        var dataLength=dataSet.data.length;
        for(let i=0;i<dataLength;i++){
            sum+=dataSet.data[i];
        }
        setMean((sum/dataLength).toFixed(2));
        index = parseInt(dataLength/2);
        if(dataLength % 2 ===0){
            med=dataSet.data[index];
        }else{
            med=(dataSet.data[index]+dataSet.data[index+1])/2;
        }
        for(let i=0;i<dataLength;i++){
            sdTemp=Math.pow((dataSet.data[i]-mean),2);
        }
        sdTemp=Math.sqrt(sdTemp/dataLength);
        for(let i=0;i<dataLength;i++){
            ctr=0;
            for(let j=i;j<dataLength;j++){
                if(dataSet.data[i]===dataSet.data[j])
                    ctr++;
                else
                    break;
            }
            if(ctr>ctrMax){
                ctrMax=ctr;
                modeTemp=dataSet.data[i];
            }
        }
        setMedian(med);
        setMode(modeTemp);
        setSd(sdTemp.toFixed(2));
    }
    return (
        <div className='container'>
        <div className='stat'>
        <button className="waves-effect waves-light btn-large" onClick={loadNewDataset}>Load new dataset</button>
        <br/><br/>
            <div className="row">
                <div className='col s10'>
                    <div className="input-field">
                      <input id="number" type="text" onChange={(e)=>setNum(e.target.value)} />
                      <label for="number">Enter a number</label>
                    </div>
                </div>
                <div className='col s2'>
                    <button className="waves-effect waves-light btn-large left" onClick={handleAddition}>Add Number</button>
                </div>
            </div>
            <h4>{dataSetName}</h4>
            <div>
              <div className="col s12 m5">
                  <div className='row'>
                    <div className="col s3 m3">
                        <div className="card-panel white">
                            <div className='s2'><b>Mean</b></div>
                            <div className='s2'>{mean}</div>
                        </div>
                    </div>
                    <div className="col s3 m3">
                        <div className="card-panel white">
                            <div className='s2'><b>Median</b></div>
                            <div className='s2'>{median}</div>
                        </div>
                    </div>
                    <div className="col s3 m3">
                        <div className="card-panel white">
                            <div className='s2'><b>Mode</b></div>
                            <div className='s2'>{mode}</div>
                        </div>
                    </div>
                    <div className="col s3 m3">
                        <div className="card-panel white">
                            <div className='s2'><b>SD</b></div>
                            <div className='s2'>{sd}</div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
        </div>
    )
}

export default Dashboard;
