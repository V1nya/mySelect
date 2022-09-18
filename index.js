import {Select} from "./select/select";
import './select/style.css'

const select=new Select('#select',{
    placeHolder:'Select element',
    selectedId:'4',
    data:[
        {id:'1',value:'JavaScrip'},
        {id:'2',value:'Java'},
        {id:'3',value:'C#'},

    ],
    isSelected(item){
        console.log('selectedItem',item)
    }
})
window.s=select