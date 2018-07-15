import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './home';
import { LoginScreen } from './login';
import { SignupScreen } from './signup';
import  {DeckScreen}  from "./components/DeckScreen/index";
import {CreateDeck} from "./components/DeckScreen/second";
import {DeckSettings} from "./components/DeckScreen/third";
import {DeckDownload} from "./components/DeckScreen/fourth";
import {DownloadDeckList} from "./components/DeckScreen/DownloadDeckList";
import {CardCreationScreen} from "./Objects/CardCreationScreen";
import {CardViewer} from "./Objects/CardViewer";


/*const AppNavigator = createStackNavigator({
    Home: { screen: HomeScreen },
    Login: { screen: LoginScreen},
    Signup: { screen: SignupScreen },
    DeckScreen: { screen: DeckScreen },
    CreateDeck: { screen: CreateDeck},
    DeckDownload: { screen: DeckDownload },
    DeckSettings: { screen: DeckSettings },
    DownloadDeckList: {screen: DownloadDeckList},
    CardCreationScreen: {screen: CardCreationScreen},
    CardViewer: {screen: CardViewer}


  },
  { headerMode: 'none' ,
   initialRouteName: 'DeckScreen' }
);*/

export const RootNavigator = (signedIn = false) => {
  return createStackNavigator({
      Home: HomeScreen,
      Login: LoginScreen,
      Signup: SignupScreen,
      DeckScreen: DeckScreen,
      CreateDeck: CreateDeck,
      DeckDownload: DeckDownload,
      DeckSettings: DeckSettings,
      DownloadDeckList: DownloadDeckList,
      CardCreationScreen: CardCreationScreen,
      CardViewer: CardViewer
    }, 
    { 
      headerMode: 'none',
      initialRouteName: signedIn ? 'DeckScreen' : 'Home'
    }
  );
}

//export default AppNavigator;