import StationaryCombustion from './calculateStationaryCombustion';
import MobileCombustion from './calculateMobileCombustion';
import PurchasedElectricity from './calculatePurchasedElectricity';
export const calculate = {
	StationaryCombustion,
	MobileCombustion,
	PurchasedElectricity,
};
export {
	formatTonnesColored,
	stringToColor,
	formatEmissionsPerArea,
} from './helpers';
