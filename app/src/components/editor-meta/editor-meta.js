import React, {Component} from 'react';

// editing meta tags
export default class EditorMeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meta: {
                title: '',
                keywords: '',
                description: ''
            }
        }
    }

    componentDidMount() {
        this.getMeta(this.props.virtualDom);
    }

    componentDidUpdate(prevProps) {
        if (this.props.virtualDom !== prevProps.virtualDom) {
            this.getMeta(this.props.virtualDom);
        }
    }

    getMeta(virtualDom) {
        this.title = virtualDom.head.querySelector('title') || virtualDom.head.appendChild(virtualDom.createElement('title'));

        this.keywords = virtualDom.querySelector('meta[name="keywords"]');
        if (!this.keywords) {
            this.keywords = virtualDom.head.appendChild(virtualDom.createElement('meta'));
            this.keywords.setAttribute('name', 'keywords');
            this.keywords.setAttribute('content', '');      
        }

        this.description = virtualDom.querySelector('meta[name="description"]');
        if (!this.description) {
            this.description = virtualDom.head.appendChild(virtualDom.createElement('meta'));
            this.description.setAttribute('name', 'description');
            this.description.setAttribute('content', ''); 
        }

        this.setState({
            meta: {
                title: this.title.innerHTML,
                keywords: this.keywords.getAttribute('content'),
                description:this.description.getAttribute('content')
            }
        })
    }

    applyMeta() {
        this.title.innerHTML = this.state.meta.title;
        this.keywords.setAttribute('content', this.state.meta.keywords);
        this.description.setAttribute('content', this.state.meta.description)
    }

    onValueChange(e) {
        if(e.target.getAttribute('data-title')) {
            e.persist(); 
            this.setState(({meta}) => {     
                const newMeta = {          
                    ...meta,               
                    title: e.target.value
                }

                return {
                    meta: newMeta
                }
            })
        } else if(e.target.getAttribute('data-key')) {
            e.persist(); 
            this.setState(({meta}) => {
                const newMeta = {
                    ...meta,
                    keywords: e.target.value
                }

                return {
                    meta: newMeta
                }
            })
        } else {
            e.persist(); 
            this.setState(({meta}) => {
                const newMeta = {
                    ...meta,
                    description: e.target.value
                }

                return {
                    meta: newMeta
                }
            })
        } 
    }

    render() {
        const {modal, target} = this.props;
        const {title, keywords, description} = this.state.meta;

        return (
            <div id={target} uk-modal={modal.toString()}>
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Редактирование Meta-гэтов</h2>

                    <form>
                        <div className="uk-margin">
                            <input 
                                data-title 
                                className="uk-input"
                                type="text" 
                                placeholder="Title" 
                                onChange={(e) => this.onValueChange(e)}
                                value={title} />
                        </div>
                        <div className="uk-margin">
                            <textarea 
                                data-key 
                                className="uk-textarea" 
                                rows="5" 
                                placeholder="Keywords" 
                                onChange={(e) => this.onValueChange(e)} 
                                value={keywords}>  
                            </textarea>
                        </div>
                        <div className="uk-margin">
                            <textarea 
                                data-description 
                                className="uk-textarea" 
                                rows="5" 
                                placeholder="Description" 
                                onChange={(e) => this.onValueChange(e)} 
                                value={description}>
                            </textarea>
                        </div>
                        <p className="uk-text-right">
                            <button className="uk-button uk-button-default uk-margin-small-right uk-modal-close" 
                            type="button"> Отменить
                            </button>
                            <button className="uk-button uk-button-primary uk-margin-small-right uk-modal-close" 
                                    type="button"
                                    onClick={() => {this.applyMeta()}}> Применить 
                            </button>
                        </p>
                    </form>

                    
                </div>
            </div>
           
        )
    }
}