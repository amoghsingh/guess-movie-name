import { useDispatch, useSelector } from 'react-redux';
import { updateTheme } from '../redux/actions/theme';
import { StateType } from '../types/stateTypes';


const ThemeSwitch = () => {

  const theme = useSelector((state: StateType)=> state?.app?.darkMode );
  console.log("theme : ", theme);
  const dispatch = useDispatch();
 
 const handleThemeChange = () => {
  dispatch(updateTheme(!theme))
 }

  return (
    <span>
      <input type="checkbox" name="theme-switch" checked={theme} onChange={handleThemeChange} /> {theme?"Dark Mode":"Light Mode"}
    </span>
  )
}

export default ThemeSwitch