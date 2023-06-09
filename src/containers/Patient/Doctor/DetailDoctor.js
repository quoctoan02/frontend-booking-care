import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInfoDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: '',
            currentDoctorId: -1,
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({
                currentDoctorId: this.props.match.params.id,
            });
            let res = await getDetailInfoDoctor(this.props.match.params.id);
            if (res && res.errCode === 0) {
                this.setState({ detailDoctor: res.data });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({});
        }
    }

    render() {
        let { language } = this.props;
        let { detailDoctor } = this.state;
        let nameVi = '';
        let nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        return (
            <>
                <HomeHeader isShowBanner={false} />

                <div className="doctor-detail-container">
                    <div className="intro-doctor container-md">
                        <div
                            className="content-left"
                            style={{
                                backgroundImage: `url(${this.state.detailDoctor.image})`,
                            }}
                        ></div>
                        <div className="content-right">
                            <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                            <div className="down">
                                {detailDoctor &&
                                    detailDoctor.Markdown &&
                                    detailDoctor.Markdown.description && (
                                        <div style={{ whiteSpace: 'pre-wrap' }}>
                                            {detailDoctor.Markdown.description}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor container-md">
                        <div className="content-left">
                            <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfo doctorIdFromParent={this.state.currentDoctorId} />
                        </div>
                    </div>
                    <div
                        style={{
                            borderBottom: '2px solid #ddd',
                            borderTop: '2px solid #ddd',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <div className="detail-info-doctor container-md">
                            {detailDoctor &&
                                detailDoctor.Markdown &&
                                detailDoctor.Markdown.contentHTML && (
                                    <div
                                        className=""
                                        dangerouslySetInnerHTML={{
                                            __html: detailDoctor.Markdown.contentHTML,
                                        }}
                                    ></div>
                                )}
                        </div>
                    </div>
                    <div className="comment-doctor"></div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
