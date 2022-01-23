/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const userProfession = useSelector(getProfessionById(id));
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    if (!professionsLoading) {
        return <p>{userProfession.name}</p>;
    } else return "loading ...";
};
Profession.propTypes = {
    _id: PropTypes.string
};
export default Profession;
