import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import AuthorList from "./AuthorList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class AuthorsPage extends React.Component {
  state = {
    redirectToAddAuthorPage: false
  };

  componentDidMount() {
    const { authors } = this.props;

    // only load on initial site render, not  page-to-page or refresh

    if (authors.length === 0) {
      this.props.actions.loadAuthors().catch(error => {
        alert("loading authors failed" + error);
      });
    }
  }

  handleDeleteAuthor = async author => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteAuthor(author);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddAuthorPage && <Redirect to="/author" />}
        <h2>Authors</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddAuthorPage: true })}
            >
              Add Author
            </button>

            <AuthorList
              onDeleteClick={this.handleDeleteAuthor}
              authors={this.props.authors}
            />
          </>
        )}
      </>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
    courses: state.courses,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteAuthor: bindActionCreators(authorActions.deleteAuthor, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsPage);
