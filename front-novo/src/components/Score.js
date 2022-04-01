import React from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import api from '../api';
import { useHistory } from 'react-router';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useScores() {
  const query = useQuery();
  const o = query.get("o")
  const c = query.get("c")
  const e = query.get("e")
  const a = query.get("a")
  const s = query.get("s")
  const scores = {
    Openness: +o,
    Conscientiousness: +c,
    Extroversion: +e,
    Agreeableness: +a,
    "Emotional Stability": +s,
  };
  return scores;
}
