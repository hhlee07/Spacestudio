import * as React from 'react';
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  OutlinedInput,
  ListItemText,
  Checkbox,
  Select,
  ListSubheader,
  Typography
} from '@mui/material';
import CreateModel from '../CreateModel';
import { useStores } from '../../stores/Context';
import { observer } from 'mobx-react';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const BoxSx = { color: 'inherit', width: 1, height: 1 / 3, mt: 3, bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' };
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const districts = [
  { 'city': { 'name': '성남시', 'id': 1 }, 'dong': [{ 'name': 'gumi', 'id': 11 }, { 'name': 'geumgok', 'id': 12 }] },
  { 'city': { 'name': '용인시', 'id': 2 }, 'dong': [{ 'name': 'dongchun', 'id': 21 }] }
];
const objectList = ['건물', '도로', '강'];


export default observer(() => {

  const [city, setCity] = React.useState('');
  const [object, setObject] = React.useState([]);

  const { ModelStore } = useStores();


  const renderDongSelect = (dist) => {
    const items = dist.dong.map((d) => (
      <MenuItem key={d.id} value={d.name}>{d.name}</MenuItem>
    ));
    return [<ListSubheader key={dist.city.id} value={dist.city.name}>{dist.city.name}</ListSubheader>, items]
  };


  const cityChange = (event) => {
    setCity(event.target.value);
  }


  const objectChange = (event) => {
    const {
      target: { value },
    } = event;
    setObject(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const handleSubmit = () => {

    CreateModel(city, object, ModelStore.firstMed).then(
      val => { ModelStore.addModel(val); }
    );
    //useMemo( () => props.setModel( props.model.push(CreateModel(city, object, props.med, props.setMed), [city, object])));
  }


  return (
    <Box sx={BoxSx}>
      <Typography component={'div'} variant="body1" sx={{ mb: 1, mt: 2, flexGrow: 1, color: 'purple', fontWeight: 500, textAlign: 'center' }}>
        Select District (Dong) and Objects
      </Typography>
      <FormControl sx={{ m: 1, width: 100, flexGrow: 1 }}>
        <InputLabel htmlFor="dong-select">District</InputLabel>
        <Select
          defaultValue=""
          id="dong-select"
          label="District"
          value={city}
          onChange={cityChange}
        >
          {districts.map((dist) => (renderDongSelect(dist)))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 100, flexGrow: 1 }}>
        <InputLabel id="object-select">Object</InputLabel>
        <Select
          labelId="object-select"
          id="object-select"
          multiple
          value={object}
          onChange={objectChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {objectList.map((obj) => (
            <MenuItem key={obj} value={obj}>
              <Checkbox checked={object.indexOf(obj) > -1} />
              <ListItemText primary={obj} />
            </MenuItem>
          ))}
          <MenuItem value="">
            <Checkbox disabled />
            <ListItemText primary="지형 (미구현)" />
          </MenuItem>
        </Select>
      </FormControl>
      <Button onClick={handleSubmit} sx={{ mt: 1, mb: 2, width: 0.5, color: 'inherit', border: 0.7 }} >
        생성
      </Button>
    </Box>
  );
})
