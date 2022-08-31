import React, { ChangeEvent, ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from 'react'


type ProfileStatusType = {
    status: string
    updateUserStatus: (status:string)=> void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {
     state = {
        editeMode: false,
        status: this.props.status
      
        }
    activateEditeMode=()=> {
          
        this.setState({
            editeMode: true
        })
    }

    deactivateEditeMode=()=> {
        this.setState({
            editeMode: false
        });
        this.props. updateUserStatus(this.state.status)

    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })

    }
    componentDidUpdate(prevProps:any, prevState:any) {
        if(prevProps.status !== this.props.status)
       this.setState({status: this.props.status}) 
    }
    render() {

        return (
            <>
                <div>
                    {!this.state.editeMode &&
                        <div >
                            <span onDoubleClick={this.activateEditeMode}>{this.props.status || '---'}</span>
                        </div>
                    }
                    {this.state.editeMode &&
                        <div>
                            <input onChange={this.onStatusChange}  autoFocus={true} onBlur={this.deactivateEditeMode} value={this.state.status} />
                        </div>
                    }
                </div>
            </>
        );

    }
}

