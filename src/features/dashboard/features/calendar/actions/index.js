import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { generateDateRange } from "../../../../../util/functions";

import axios from "axios";
import firebase from "firebase";
dayjs.extend(LocalizedFormat);
