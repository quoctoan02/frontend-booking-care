import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinic } from '../../../services/userService';
import _ from 'lodash';
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorIds: [],
            detailClinic: '',
            currentClinicId: '',
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({
                currentClinicId: this.props.match.params.id,
            });
            let res = await getDetailClinic(this.props.match.params.id);
            if (res && res.errCode === 0) {
                console.log(res);
                this.setState({
                    detailClinic: res.data,
                    doctorIds: res.data.doctorIds,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { doctorIds, detailClinic } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-clinic-container">
                <HomeHeader isShowBanner={false} />{' '}
                <div className="detail-clinic-body">
                    {detailClinic && !_.isEmpty(detailClinic) && (
                        <div
                            className="clinic-profile"
                            style={{
                                backgroundImage: `url('https://cdn.bookingcare.vn/fo/2019/12/13/120331-co-xuong-khop.jpg')`,
                            }}
                        >
                            <div className="profile-clinic-background">
                                <div className="avatar-clinic"></div>
                                <div className="info-clinic">
                                    <div className="name-clinic">{detailClinic.name}</div>
                                    <div className="address-clinic">{detailClinic.address}</div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div
                        className="detail-clinic-description"
                        dangerouslySetInnerHTML={{
                            __html: detailClinic.descriptionHTML,
                        }}
                    ></div>
                    <div className="detail-clinic-content">
                        {doctorIds &&
                            doctorIds.length > 0 &&
                            doctorIds.map((item, index) => {
                                return (
                                    <div
                                        className="each-doctor"
                                        key={index}
                                    >
                                        <div className="detail-clinic-content-left">
                                            <div className="profile-doctor">
                                                <ProfileDoctor
                                                    doctorId={item.doctorId}
                                                    isShowDescription={true}
                                                    isShowLinkDetail={true}
                                                    isHidePrice={true}
                                                />
                                            </div>
                                        </div>

                                        <div className="detail-clinic-content-right">
                                            <div className="doctor-schedule">
                                                <DoctorSchedule
                                                    doctorIdFromParent={item.doctorId}
                                                />
                                            </div>
                                            <div className="doctor-extra-info">
                                                <DoctorExtraInfo
                                                    doctorIdFromParent={item.doctorId}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
