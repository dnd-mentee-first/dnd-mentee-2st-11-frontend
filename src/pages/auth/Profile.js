import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { api } from "api";
import { Typography, TextField, Button, Paper, Avatar } from "@material-ui/core";
import TagsInput from 'react-tagsinput'
import './tagsinput.css'
import Swal from "sweetalert2";

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

const Profile = props => {
  const classes = useStyles();
  const [account, setAccount] = useState(null);
  const [technology, setTechNology] = useState([]);
  const [tags, setTags] = useState(null);

  const handleTechChange = tech => {
    setTechNology(tech);
  }

  useEffect(() => {
    getProfile();
    // getTags();
  }, []);

  const getProfile = () => {
    api.get("accounts/profile").then(res => {
      setAccount(res.data);
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const getTags = () => {
    api.get("technology").then(res => {
      setTags(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const submitTech = () => {
    console.log(technology);
  }

  const submitAccount = () => {
    console.log(account);
    api.put(`accounts/${account.id}`, account).then(res => {
      Swal.fire({
        title: "수정 성공!",
        icon: "success",
        text: "회원 정보가 수정 되었습니다.",
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  const handleModify = key => event => {
    setAccount({ ...account, [key]: event.target.value });
  }

  const deleteInterview = id  => {
    api.delete(`selfInterviews/${id}`).then(res => {
      if (res.status === 200) {
        Swal.fire({
          title: "삭제 성공",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }}
    ).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className={classes.root}>
      {account &&
        <>
          <div style={{ marginBottom: 20 }} />
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>기타 정보</Typography>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar src={account.image} style={{ alignSelf: 'center', width: 180, height: 180 }}></Avatar>
            </div>
            <Typography variant="h6" style={{ textAlign: 'center', marginBottom: 20 }}>{account.email}</Typography>

            <TextField
              onChange={handleModify("nickName")}
              value={account.nickName}
              InputLabelProps={{ shrink: true }}
              fullWidth label="이름"
              variant="outlined" />
            <div style={{ marginBottom: 20 }} />
            <TextField
              onChange={handleModify("socialLink")}
              value={account.socialLink}
              InputLabelProps={{ shrink: true }}
              fullWidth label="소셜링크"
              variant="outlined" />
            <div style={{ marginBottom: 20 }} />
            <TextField
              onChange={handleModify("position")}
              value={account.position}
              InputLabelProps={{ shrink: true }}
              fullWidth label="직군"
              variant="outlined" />
            <div style={{ marginBottom: 20 }} />
            <TextField
              onChange={handleModify("oneLineIntroduce")}
              value={account.oneLineIntroduce}
              InputLabelProps={{ shrink: true }}
              fullWidth label="한줄소개"
              variant="outlined" />
            <div style={{ display: 'flex', justifyContent: "flex-end" }}>
              <Button onClick={() => submitAccount()} variant="contained" color="primary" style={{ marginTop: 20 }}>정보 수정</Button>
            </div>
          </Paper>

          <div style={{ marginBottom: 20 }} />
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>기술 태그</Typography>
            <TagsInput value={technology} onChange={handleTechChange} />
            <div style={{ display: 'flex', justifyContent: "flex-end" }}>
              <Button onClick={() => submitTech()} variant="contained" color="primary" style={{ marginTop: 20 }}>태그 추가</Button>
            </div>
          </Paper>

          <Paper elevation={3} style={{ padding: 30, marginBottom: 20 }}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>셀프 인터뷰</Typography>
            {account.selfInterviews.map(interview => (
              <Paper elevation={3} key={interview.id} style={{padding: 20, marginBottom: 20}}>
                <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{interview.title}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{interview.content}</Typography>
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 20}}>수정</Button>
                  <Button onClick={() => deleteInterview(interview.id)} variant="contained" color="secondary">삭제</Button>
                </div>
              </Paper>
            ))}
          </Paper>

          <Paper elevation={3} style={{ padding: 30, marginBottom: 20 }}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>경력사항</Typography>
            {account.experiences.map(experience => (
              <Paper elevation={3} key={experience.id} style={{padding: 20, marginBottom: 20}}>
                <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{experience.companyName}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{experience.position}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{experience.description}</Typography>
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 20}}>수정</Button>
                  <Button variant="contained" color="secondary">삭제</Button>
                </div>
              </Paper>
            ))}
          </Paper>

          <Paper elevation={3} style={{ padding: 30, marginBottom: 20 }}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>자격증</Typography>
            {account.licenses.map(license => (
              <Paper elevation={3} key={license.id} style={{padding: 20, marginBottom: 20}}>
                <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{license.name}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{license.institution}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{license.description}</Typography>
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 20}}>수정</Button>
                  <Button variant="contained" color="secondary">삭제</Button>
                </div>
              </Paper>
            ))}
          </Paper>

          <Paper elevation={3} style={{ padding: 30, marginBottom: 20 }}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>수상내역</Typography>
            {account.prizes.map(prize => (
              <Paper elevation={3} key={prize.id} style={{padding: 20, marginBottom: 20}}>
                <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{prize.name}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{prize.description}</Typography>
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 20}}>수정</Button>
                  <Button variant="contained" color="secondary">삭제</Button>
                </div>
              </Paper>
            ))}
          </Paper>

          <Paper elevation={3} style={{ padding: 30, marginBottom: 20 }}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>프로젝트</Typography>
            {account.projects.map(project => (
              <Paper elevation={3} key={project.id} style={{padding: 20, marginBottom: 20}}>
                <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{project.name}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{project.role}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{project.description}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{project.projectLink}</Typography>
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 20}}>수정</Button>
                  <Button variant="contained" color="secondary">삭제</Button>
                </div>
              </Paper>
            ))}
          </Paper>
          {account.email}
          {account.nickName}
          {account.favorite}
          {account.position}
          {account.userRole}
          {account.createdAt}
          {account.oneLineIntroduce}
          {account.image}
          {account.socialLink}
          {/* {account.enterprise} */}
          {/* {account.experiences} */}
          {/* {account.licenses} */}
          {/* {account.prizes} */}
          {/* {account.projects} */}
        </>
      }
    </div>
  );
};

export default Profile;
