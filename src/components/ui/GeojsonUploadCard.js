import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import RequestHttp from '../RequestHttp';
import CreateSpaceBtnViewModel from './CreateSpaceBtnViewModel';

export default function GeojsonUploadCard() {
  const { open, handleClickOpen, handleClose } = new CreateSpaceBtnViewModel();

  return (
    <Box>
      <Button color='inherit' sx={{ width: 1, height: 1/3, bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'column'}} onClick={handleClickOpen} >
        <Add sx={{color: '#5f5f5f', mt: 5}} />
        <Typography variant="body1" sx={{color: '#5f5f5f', mb: 5}}>
          공공데이터로 도시 모델 만들기
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>공공데이터 업로드</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Geojson 파일을 직접 업로드하여 도시 모델을 만듭니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button component="label">
            공간 생성
            <input type='file' accept=".geojson, .json" onChange={(e) => {RequestHttp(e,'SPACECREATE')}} hidden/>
          </Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
