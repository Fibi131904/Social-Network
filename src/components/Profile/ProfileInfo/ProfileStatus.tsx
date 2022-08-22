import React from 'React'


type ProfileStatusType = {
    status: string
}
export class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editeMode: false,
        title: 'Yo'
    }
    activateEditeMode() {
        this.setState({
            editeMode: true
        })

    }
    deactivateEditeMode() {
        this.setState({
            editeMode: false
        })

    }
    render() {

        return (
            <>
                <div>
                    {!this.state.editeMode &&
                        <div >
                            <span onDoubleClick={this.activateEditeMode.bind(this)}>{this.props.status}</span>
                        </div>
                    }
                    {this.state.editeMode &&
                        <div>
                            <input autoFocus={true} onBlur={this.deactivateEditeMode} value={this.props.status} />
                        </div>
                    }
                </div>
            </>
        );

    }
}

