/* eslint-disable eqeqeq */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import AuthorForm from "./AuthorForm";
import { newAuthor } from "../common/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageAuthorPage({
  authors,
  loadAuthors,
  saveAuthor,
  history,
  ...props
}) {
  const [author, setAuthor] = useState({ ...props.author });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // efficiency -> only run on first mount(empty array), not every render
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("loading authors failed" + error);
      });
    } else {
      setAuthor({ ...props.author });
    }
  }, [props.author, authors.length, loadAuthors]);

  function handleChange(event) {
    const { name, value } = event.target;
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      [name]: value
    }));
  }

  function formIsValid() {
    const { name, avgCourseRating } = author;
    const errors = {};

    if (!name) errors.title = "Name is required.";
    if (!avgCourseRating)
      errors.avgCourseRating = "Average Course Rating is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveAuthor(author)
      .then(() => {
        toast.success("Author saved.");
        history.push("/authors");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <AuthorForm
      author={author}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

// selector function
export function getAuthorById(authors, id) {
  return authors.find(author => author.id == id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const author =
    id && state.authors.length > 0
      ? getAuthorById(state.authors, id)
      : newAuthor;
  return {
    author: author,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadAuthors: authorActions.loadAuthors,
  saveAuthor: authorActions.saveAuthor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthorPage);
