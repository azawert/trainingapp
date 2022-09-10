import React from "react";
import { useMutation, useQuery } from "react-query";
import { $api } from "../../../api/api";
import Layout from "../../common/Layout";
import debounce from 'lodash/debounce'
import cn from 'classnames'
import bgImage from "../../../images/singleExercise.jpg";
import notCompletedCheckbox from "../../../images/completed.svg";
import completedCheckbox from "../../../images/completed_checked.svg";
import styles from "./Exercise.module.sass";
import Alert from "../../../ui/Alert/Alert";
import { useParams,useNavigate } from "react-router-dom";
const SingleExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data,refetch,isSuccess } = useQuery(
    "GetExercise",
    () =>
      $api({
        url: `/exercises/log/${id}`,
      }),{
        
      }
  );
  const {mutate:changeLog,} = useMutation('changeLogOfExercise',({timeIndex,key,value})=>{
    $api({
      url:"/exercises/log",
      type:'PUT',
      body:{timeIndex,key,value,logId: id},
    })
    
  },{
    onSuccess(){
      refetch()
      }
  })
  const {mutate:changeCompletedLog,} = useMutation('changeLogCompleted',()=>{
    $api({
      url:"/exercises/log/completed",
      type:'PUT',
      body:{completed:true,logId: id},
    })
    
  },{
    onSuccess(){
      navigate(-1)
      }
  })

React.useEffect(()=>{
  if(isSuccess){
      if(data.times.length===data.times.filter(item=>item.completed).length){
        changeCompletedLog()
      }
  }
},[data?.times,isSuccess])

  return isLoading
    ? "Загрузка..."
    : data && (
        <>
          <Layout
            backlink={true}
            image={bgImage}
            text={data.exercise.name}
            exerciseImage={data.exercise.imageName}
            minutes={data.minutes}
            isExercisePage={true}
          />
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <div>
                <span>Previous</span>
              </div>
              <div>
                <span>Repeat & weight</span>
              </div>
              <div>
                <span>Completed</span>
              </div>
            </div>
            {data.times.map((item, index) => {
              
              console.log(item);
              return (
                <div className={cn(styles.row,{
              [styles.completed] : item.completed
            })} style={{height:37}}>
                  <div className={styles.opacity} style={{color:'#fff'}}>
                    <input type={"number"} value={`${item.prevWeight}`} disabled />
                    <i>kg/</i>
                    <input type={"number"} value={`${item.prevReps}`} disabled />
                  </div>
                  <div>
                    <input type={"number"} defaultValue={`${item.weight}`} disabled={item.completed?true:false} onChange={debounce((e)=>{
                      changeLog({timeIndex:index,key:'weight',value:e.target.value})
                    },800)} />
                    <i>kg/</i>
                    <input type={"number"} defaultValue={`${item.reps}`} disabled={item.completed?true:false} onChange={debounce((e)=>{
                      changeLog({timeIndex:index,key:'reps',value:e.target.value},800)
                    })}/>
                  </div>
                  <div>
                    <img
                      alt="checkbox"
                      src={
                        item.completed
                          ? completedCheckbox
                          : notCompletedCheckbox
                      }
                      className={styles.checkbox}
                      style={{marginTop:10}}
                      onClick={()=>{
                        changeLog({
                          timeIndex:index,
                          key:"completed",
                          value:item.completed?!item.completed:true
                        })
                      }}
                    ></img>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
};

export default SingleExercise;
