import { Button,Typography,Grid,Box } from '@mui/material'
import { useState,useEffect,useContext, } from 'react'
import DietDialog from './DietGoal';
import Calender from 'components/common/Calender';
// import axios from 'axios';
// import { BASE_URL } from 'common/Properties';
import BasicTable from 'components/common/Table';
import SearchBar from './SearchBar'
import Piechart from './Piechart'
import AppBar from '../../components/appbar/AppBar';
import Footer from '../../components/Footer/Footer';
import Container from '@mui/material/Container';

export default function Diet(){
  const userInfo = JSON.parse(localStorage.getItem('user')).userInfo
  console.log(userInfo.purpose)
  const [dietDialog,setDietDialog]=useState(false)
  const [dialog,setDialog]=useState(false)
  const [list,setList]=useState([])


  const curr = [0,0,0]
  list.forEach(el=>{
    curr[0]+=el.carbohydrate*el.newServing/el.servingSize
    curr[1]+=el.protein*el.newServing/el.servingSize
    curr[2]+=el.fat*el.newServing/el.servingSize
  })
  var cal
  const goal=[0,0,0]
  const LB_WEIGHT = userInfo.weight*2.20462
  switch (userInfo.purposeId) {
    case 1:
      cal = LB_WEIGHT*10*userInfo.activePoint
      goal[0]= cal/2; goal[1]=cal/4; goal[2]=cal/9
      break;
    case 2:
      cal = LB_WEIGHT*10*userInfo.activePoint-300
      goal[1]=LB_WEIGHT*1.1; goal[2]=LB_WEIGHT*0.3; goal[0]=cal-(goal[1]*4+goal[2]*9)/4
      break;
    case 3:
      cal = LB_WEIGHT*10*userInfo.activePoint+200
      goal[1]=LB_WEIGHT*0.9; goal[2]=LB_WEIGHT*0.4; goal[0]=cal-(goal[1]*4+goal[2]*9)/4
      break
    default:
      break;
  }

  function open(){
    setDietDialog(true)
  }
  function close(){
    setDietDialog(false)
  }
  // function getList(){
  //   console.log('getlist')
  //   const data = {
  //     date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
  //     userId:userInfo.id
  //   }
  //   axios.get(BASE_URL+'foodmanagement',{params:data})
  //   .then(res=>{
  //     var dailyList=[]
  //     const dataList = res.data.data
  //     if (dataList) {
  //       dataList.forEach(el=>
  //         {
  //           const rate=el.newServing/el.servingSize
  //           dailyList.push({...el,
  //             kcal:Math.round(el.kcal*rate),
  //             carbohydrate:Math.round(el.carbohydrate*rate),
  //             fat:Math.round(el.fat*rate),
  //             protein:Math.round(el.protein*rate),
  //           }) 
  //         }) 
  //       }
  //     else {dailyList = []}
  //     setList(dailyList)
  //   })
  //   .catch(err=>console.log(err))
  // }


  return (
    <div style={{display: 'flex', flexDirection:'column', minHeight:'100%', }}>
      <AppBar dialog={dialog} setDialog={setDialog} />
      <div className='d-flex justify-content-center' style={{justifyItems:'center', flex:'1', padding:0, marginLeft: 45, marginRight:45}}>
        <div style={{paddingLeft:0}} >
          <div align='center'>
            <Box sx={{borderRadius:1,backgroundColor:'#D3E4CD', marginBottom:'5rem', marginTop:'3rem', height:'12rem', width:{xs:300,sm:600}}}  >
              {userInfo.purpose && <div style={{paddingTop:'1.5rem', display:'flex', flexDirection:'column', paddingLeft:'5rem'}}>
                {/* <Typography className="d-flex justify-content-start" variant='h4'>당신의</Typography> */}
                {userInfo.purposeId===1&&<Typography className="d-flex justify-content-start"  variant='h5'>목표는 유지입니다.</Typography>}
                {userInfo.purposeId===2&&<Typography className="d-flex justify-content-start" variant='h5'>목표는 다이어트입니다.</Typography>}
                {userInfo.purposeId===3&&<Typography className="d-flex justify-content-start" variant='h5'>목표는 린매스업입니다.</Typography>}
                <Typography className="d-flex justify-content-start" variant='h5'>당신의 활동지수는 {userInfo.activePoint}입니다.</Typography>
                <Typography className="d-flex justify-content-start" variant='h5'>현재 몸무게는 {userInfo.weight}kg입니다.</Typography>
                <div className="d-flex justify-content-end">
                <Button onClick={open} style={{width:'10rem', backgroundColor:'#ADC2A9', color:'white', weight:'bold', marginRight:'5rem' }}>다시 설정하기</Button>
                </div>
              </div>}
              {!userInfo.purpose && <div style={{display:'flex', flexDirection:'column',}}>
                <Typography variant='h3'style={{weight:'bold', color:'black', padding:'1.5rem' }}>당신의 목표는?</Typography>
                <div className="d-flex justify-content-center">
                <Button onClick={open} style={{width:'10rem', backgroundColor:'#ADC2A9', color:'white', weight:'bold' }}>목표 설정하기</Button>
                </div>
                </div>}
            </Box>
          </div>

          <Grid item  xs={12} sx={{display:'flex', justifyContent:'center'}} marginBottom={5} > 
            <Calender id={userInfo.id} list={list} setList={setList} />
          </Grid>
          <Grid container spacing={2} margin={1}>
            <Grid item xs={12} lg={5} sx={{border:1,borderRadius:1,}}>
              <Typography variant='h3'>오늘의 식단 추가</Typography>
              <SearchBar setList={setList} list={list} />
              <BasicTable list={list} setList={setList} />
            </Grid>
            
            {/* <Grid item xs={5} align='center' marginBottom={5}>
            </Grid> */}
            
            <Grid item xs={12} lg={7} marginBottom={10}>
              <Grid container spacing={3}>
                <Grid item xs={4} padding={1}>
                  <Typography variant='h5' align='center'>탄수화물</Typography>
                  <Piechart goal={goal[0]} current={curr[0]}/>
                </Grid>

                <Grid item xs={4} padding={1}>
                  <Typography variant='h5' align='center'>단백질</Typography>
                  <Piechart goal={goal[1]} current={curr[1]}/>
                </Grid>

                <Grid item xs={4} padding={1}>
                  <Typography variant='h5' align='center'>지방</Typography>
                  <Piechart goal={goal[2]} current={curr[2]}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <DietDialog close={close} dialog={dietDialog} />

      </div>
      <Footer/>
    </div>
  )
}