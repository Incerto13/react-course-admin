/* eslint-disable eqeqeq */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./CourseList.css";

function CourseList({ courses, onDeleteClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);

  // Logic for displaying current courses
  const indexOfLastCourse = currentPage * coursesPerPage; // 5 for first page
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage; // 0 for first page
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(courses.length / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        id={number}
        className={currentPage == number ? "active" : ""}
        onClick={handlePaginate}
      >
        {number}
      </li>
    );
  });

  function handlePaginate(event) {
    setCurrentPage(event.target.id);
  }

  return (
    <>
      <div className="page-numbers">{renderPageNumbers}</div>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {currentCourses.map(course => {
            return (
              <tr key={course.id}>
                <td>
                  <Link to={"/course/" + course.id}>{course.title}</Link>
                </td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDeleteClick(course)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CourseList;
