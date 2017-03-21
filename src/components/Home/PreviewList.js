import React ,{ Component , PropTypes } from "react";
import Preview from "./Preview";

import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
} from "react-weui";


class PreviewList extends Component {
    static propTypes = {
        loading:PropTypes.bool,
        error:PropTypes.bool,
        articleList:PropTypes.arrayOf(PropTypes.object),
        loadArticles:PropTypes.func
    };

    render(){
        const {
            loading,
            error,
            articleList,
            push
        }=this.props;


        if(error){
            return <p className="message">Oops,something is wrong!</p>
        }

        if(loading){
            return <p className="message">Loading......</p>
        }
        return(
            <div>
                <Panel>
                    <PanelHeader>
                        最新热文
                    </PanelHeader>
                    <PanelBody>
                        {
                            articleList.map(item => {
                             return (<Preview {...item} key={item.id} push={push}></Preview>)
                             })
                        }
                    </PanelBody>
                    <PanelFooter href="javascript:void(0);">
                        <Cell access link>
                            <CellBody>更多</CellBody>
                            <CellFooter />
                        </Cell>
                    </PanelFooter>
                </Panel>
            </div>
        )


    }

    componentDidMount(){
        this.props.loadArticles();
    }
}

export default PreviewList;