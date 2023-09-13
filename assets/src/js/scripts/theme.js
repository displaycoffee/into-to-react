// import variables from sass
import themeVars from '../../scss/theme/_theme.module.scss';

export const theme = {
	bps : {
		bp1 : checkSassVar(themeVars.bp01),
		bp2 : checkSassVar(themeVars.bp02),
		bp3 : checkSassVar(themeVars.bp03),
		bp4 : checkSassVar(themeVars.bp04)
	}
};

// ensure an empty or undefined sass value is false
function checkSassVar(value) {
	if (value) {
		if (value == 'true') {
			return true;
		} else if (value == 'false') {
			return false;
		} else {
			let formattedValue = isNaN(value * 1) ? value.replace(/\"/gi, "'") : value * 1;
			return formattedValue;
		}
	} else {
		return false;
	}
}