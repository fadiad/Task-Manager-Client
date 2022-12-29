import React, { useEffect, useState } from "react";

import { observer, inject } from "mobx-react";
import { Link } from 'react-router-dom';

const BoardCard = (props) => {
  return (
    <Link className="link" to={`/board/${props.board.id}`}>
      <div className="board-tile">{props.board.title}</div>
    </Link>
  );
};

export default inject("boardStore")(observer(BoardCard));
