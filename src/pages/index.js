import Setting from  './Setting'
import Home from './Home'
import Creat from './NewCard/Creat'
import NewCard from './NewCard'
import Record from './Record'
import OptionView from './NewCard/OptionView'
import RecordDetail from './Record/Detail'
import Publish from './Publish/index'
import PublishDetail from './Publish/Detail'
import Serve from './Publish/Serve'

export  const route = {
    Home:{screen:Home},
    Setting:{screen:Setting},
    Creat:{screen:Creat},
    NewCard:{screen:NewCard},
    Record:{screen:Record},
    OptionView:{screen:OptionView},
    RecordDetail:{screen:RecordDetail},
    Publish:{screen:Publish},
    PublishDetail:{screen:PublishDetail},
    Serve:{screen:Serve}
}