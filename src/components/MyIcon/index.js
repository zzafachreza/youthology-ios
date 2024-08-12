import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AltArrowDown from "../../assets/icon/Bold/AltArrowDown.svg";
import ArrowLeft from "../../assets/icon/Bold/ArrowLeft.svg";
import ArrowLeftOutline from "../../assets/icon/Linear/ArrowLeft.svg";
import Eye from "../../assets/icon/Bold/Eye.svg";
import EyeClosed from "../../assets/icon/Bold/EyeClosed.svg";
import UserRounded from "../../assets/icon/Bold/UserRounded.svg";
import UserHeart from '../../assets/icon/Bold/UserHeart.svg'
import Calendar from '../../assets/icon/Bold/Calendar.svg'
import Letter from '../../assets/icon/Bold/Letter.svg'
import CloseCircle from '../../assets/icon/Bold/CloseCircle.svg'
import InfoCircle from '../../assets/icon/Bold/InfoCircle.svg'
import InfoSquare from '../../assets/icon/Bold/InfoSquare.svg'
import HomeSmile from '../../assets/icon/Bold/HomeSmile.svg'
import Cosmetic from '../../assets/icon/Bold/Cosmetic.svg'
import Whatsapp from '../../assets/icon/Bold/Whatsapp.svg'
import Bell from '../../assets/icon/Bold/Bell.svg'
import Magnifer from '../../assets/icon/Bold/Magnifer.svg'
import CalendarMark from '../../assets/icon/Bold/CalendarMark.svg'
import ClockSquare from '../../assets/icon/Bold/ClockSquare.svg'
import RoundArrowRightUp from '../../assets/icon/Bold/RoundArrowRightUp.svg'
import RoundAltArrowRight from '../../assets/icon/Bold/RoundAltArrowRight.svg'
import Gift from '../../assets/icon/Bold/Gift.svg'
import UserCircle from '../../assets/icon/Bold/UserCircle.svg'
import Filter from '../../assets/icon/Bold/Filter.svg'
import Filters from '../../assets/icon/Bold/Filters.svg'
import Stethoscope from '../../assets/icon/Bold/Stethoscope.svg'
import MapPoint from '../../assets/icon/Bold/MapPoint.svg'
import Pen2 from '../../assets/icon/Bold/Pen2.svg'
import Share from '../../assets/icon/Bold/Share.svg'
import History3 from '../../assets/icon/Bold/History3.svg'
import CheckCircle from '../../assets/icon/Bold/CheckCircle.svg'
import UploadSquare from '../../assets/icon/Bold/UploadSquare.svg'

import QuestionSquare from '../../assets/icon/Bold/QuestionSquare.svg'






export default function MyIcon({ name = 'eye', size, color }) {

    const ICON = [
        {
            key: 'magnifer',
            icon: <Magnifer width={size} height={size} fill={color} />
        },
        {
            key: 'question-square',
            icon: <QuestionSquare width={size} height={size} fill={color} />
        },
        {
            key: 'pen2',
            icon: <Pen2 width={size} height={size} fill={color} />
        },
        {
            key: 'check-circle',
            icon: <CheckCircle width={size} height={size} fill={color} />
        },
        {
            key: 'upload-square',
            icon: <UploadSquare width={size} height={size} fill={color} />
        },
        {
            key: 'history-3',
            icon: <History3 width={size} height={size} fill={color} />
        },
        {
            key: 'share',
            icon: <Share width={size} height={size} fill={color} />
        },
        {
            key: 'map-point',
            icon: <MapPoint width={size} height={size} fill={color} />
        },
        {
            key: 'stethoscope',
            icon: <Stethoscope width={size} height={size} fill={color} />
        },
        {
            key: 'gift',
            icon: <Gift width={size} height={size} fill={color} />
        },
        {
            key: 'filter',
            icon: <Filter width={size} height={size} fill={color} />
        },
        {
            key: 'filters',
            icon: <Filters width={size} height={size} fill={color} />
        },
        {
            key: 'round-arrow-right-up',
            icon: <RoundArrowRightUp width={size} height={size} fill={color} />
        },
        {
            key: 'round-alt-arrow-right',
            icon: <RoundAltArrowRight width={size} height={size} fill={color} />
        },
        {
            key: 'clock-square',
            icon: <ClockSquare width={size} height={size} fill={color} />
        },
        {
            key: 'calendar-mark',
            icon: <CalendarMark width={size} height={size} fill={color} />
        },
        {
            key: 'home-smile',
            icon: <HomeSmile width={size} height={size} fill={color} />
        },
        {
            key: 'bell',
            icon: <Bell width={size} height={size} fill={color} />
        },
        {
            key: 'cosmetic',
            icon: <Cosmetic width={size} height={size} fill={color} />
        },
        {
            key: 'whatsapp',
            icon: <Whatsapp width={size} height={size} fill={color} />
        },
        {
            key: 'alt-arrow-down',
            icon: <AltArrowDown width={size} height={size} fill={color} />
        },
        {
            key: 'arrow-left',
            icon: <ArrowLeft width={size} height={size} fill={color} />
        },
        {
            key: 'arrow-left-outline',
            icon: <ArrowLeftOutline width={size} height={size} fill={color} />
        },
        {
            key: 'eye',
            icon: <Eye width={size} height={size} fill={color} />
        },
        {
            key: 'eye-closed',
            icon: <EyeClosed width={size} height={size} fill={color} />
        },
        {
            key: 'user-rounded',
            icon: <UserRounded width={size} height={size} fill={color} />
        },
        {
            key: 'user-circle',
            icon: <UserCircle width={size} height={size} fill={color} />
        },
        {
            key: 'user-heart',
            icon: <UserHeart width={size} height={size} fill={color} />
        },
        {
            key: 'calendar',
            icon: <Calendar width={size} height={size} fill={color} />
        }, {
            key: 'letter',
            icon: <Letter width={size} height={size} fill={color} />
        },

        {
            key: 'close-circle',
            icon: <CloseCircle width={size} height={size} fill={color} />
        },
        {
            key: 'info-circle',
            icon: <InfoCircle width={size} height={size} fill={color} />
        },
        {
            key: 'info-square',
            icon: <InfoSquare width={size} height={size} fill={color} />
        },
    ]

    return ICON.filter(i => i.key == name)[0].icon
}

const styles = StyleSheet.create({});
