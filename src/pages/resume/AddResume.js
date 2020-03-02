import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { api } from 'api';
import Swal from 'sweetalert2';
import DateSelect from 'components/DateSelect';


const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));
const AddResume = (props) => {
  const classes = useStyles();
  const [interview, setInterview] = useState({});
  const [experience, setExperience] = useState({});
  const [license, setLicense] = useState({});
  const [prize, setPrize] = useState({});
  const [project, setProject] = useState({});
  const [account, setAccount] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    api.get("accounts/profile").then(res => {
      setAccount(res.data);
    }).catch(err => {
      console.log(err);
    })
  }
  const changeInterview = prop => event => {
    setInterview({ ...interview, [prop]: event.target.value });
  }

  const submitInterview = () => {
    api.post(`selfInterviews`, interview).then(res => {
      if (res.status === 201) {
        Swal.fire({
          title: '셀프 인터뷰 등록 성공!',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  const changeExperience = prop => event => {
    setExperience({ ...experience, [prop]: event.target.value });
  }

  const submitExperience = () => {
    api.post(`experiences`, experience).then(res => {
      if (res.status === 201) {
        Swal.fire({
          title: '경력사항 등록 성공!',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  const changeLicense = prop => event => {
    setLicense({ ...license, [prop]: event.target.value });
  }

  const submitLicense = () => {
    api.post(`licenses`, license).then(res => {
      if (res.status === 201) {
        Swal.fire({
          title: '자격증 등록 성공!',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  const changePrize = prop => event => {
    setPrize({ ...prize, [prop]: event.target.value });
  }

  const submitPrize = () => {
    api.post(`prizes`, prize).then(res => {
      if (res.status === 201) {
        Swal.fire({
          title: '수상내역 등록 성공!',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  const changeProject = prop => event => {
    setProject({ ...project, [prop]: event.target.value });
  }

  const submitProject = () => {
    api.post(`projects`, project).then(res => {
      if (res.status === 201) {
        Swal.fire({
          title: '프로젝트 등록 성공!',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>이력서 추가</Typography>

      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>셀프 인터뷰</Typography>
        <TextField onChange={changeInterview("title")} id="interview-title" fullWidth label="Title" variant="outlined" />
        <div style={{ marginBottom: 10 }} />
        <TextField onChange={changeInterview("content")} id="interview-content" fullWidth multiline rows="10" label="Content" variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button onClick={submitInterview} variant="contained" color="primary" style={{ marginTop: 20 }}>셀프인터뷰 추가</Button>
        </div>
      </Paper>

      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>경력사항</Typography>
        <TextField onChange={changeExperience("companyName")} label="회사명" variant="outlined" />
        <TextField onChange={changeExperience("position")} label="역할" variant="outlined" />
        <DateSelect onChange={changeExperience("joinedAt")} label="입사날짜" />
        <DateSelect onChange={changeExperience("retiredAt")} label="퇴사날짜" />
        <div style={{ marginBottom: 10 }} />
        <TextField onChange={changeExperience("description")} fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button onClick={submitExperience} variant="contained" color="primary" style={{ marginTop: 20 }}>경력 추가</Button>
        </div>
      </Paper>

      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>자격증</Typography>
        <TextField onChange={changeLicense("name")} label="자격증명" variant="outlined" />
        <TextField onChange={changeLicense("institution")} label="발급 기관" variant="outlined" />
        <DateSelect onChange={changeLicense("issuedDate")} label="발급날짜" />
        <div style={{ marginBottom: 10 }} />
        <TextField onChange={changeLicense("description")} fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button onClick={submitLicense} variant="contained" color="primary" style={{ marginTop: 20 }}>자격증 추가</Button>
        </div>
      </Paper>

      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>수상내역</Typography>
        <TextField onChange={changePrize("competition")} label="대회명" variant="outlined" />
        <TextField onChange={changePrize("name")} label="상 명" variant="outlined" />
        <DateSelect onChange={changePrize("issuedDate")} label="수상날짜" />
        <div style={{ marginBottom: 10 }} />
        <TextField onChange={changePrize("description")} fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button onClick={submitPrize} variant="contained" color="primary" style={{ marginTop: 20 }}>수상내역 추가</Button>
        </div>
      </Paper>

      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>프로젝트</Typography>
        <TextField onChange={changeProject("name")} label="프로젝트명" variant="outlined" />
        <TextField onChange={changeProject("role")} label="역할" variant="outlined" />
        <DateSelect onChange={changeProject("startedAt")} label="시작 날짜" />
        <DateSelect onChange={changeProject("endedAt")} label="끝낸 날짜" />
        <div style={{ marginBottom: 10 }} />
        <TextField onChange={changeProject("projectLink")} fullWidth label="프로젝트 링크" variant="outlined" />
        <div style={{ marginBottom: 10 }} />
        <TextField onChange={changeProject("description")} fullWidth multiline rows="4" label="프로젝트 설명" variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button onClick={submitProject} variant="contained" color="primary" style={{ marginTop: 20 }}>프로젝트 추가</Button>
        </div>
      </Paper>
      }}
    </div >
  );
};

export default AddResume;