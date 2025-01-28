// Auth Imports
import { IRoute } from "@/types/types";
import {
  HiOutlineHome,
  HiOutlineInboxArrowDown,
  HiOutlineArrowUp,
  HiOutlineClipboard,
  HiOutlineArchiveBox,
  HiOutlineUserGroup,
  HiOutlineTruck,
  HiOutlineClipboardDocument,
  HiOutlineLockClosed,
} from "react-icons/hi2";

export const routes: IRoute[] = [
  {
    name: "Main Dashboard",
    path: "/dashboard",
    icon: <HiOutlineHome className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
  },
  {
    name: "Barang Masuk",
    path: "/barang-masuk",
    icon: (
      <HiOutlineInboxArrowDown className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
  },
  {
    name: "Barang Keluar",
    path: "/barang-keluar",
    icon: (
      <HiOutlineArrowUp className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
  },
  {
    name: "Permintaan Barang",
    path: "/permintaan-barang",
    icon: (
      <HiOutlineClipboard className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
  },
  {
    name: "Master Barang",
    path: "/master-barang",
    icon: (
      <HiOutlineArchiveBox className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
  },
  {
    name: "Master Karyawan",
    path: "/master-karyawan",
    icon: (
      <HiOutlineUserGroup className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
  },
  {
    name: "Master Kendaraan",
    path: "/master-kendaraan",
    icon: (
      <HiOutlineTruck className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
  },
  {
    name: "Master Suplier",
    path: "/master-suplier",
    icon: (
      <HiOutlineClipboardDocument className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
  },
  {
    name: "Master Akses",
    path: "/master-akses",
    icon: (
      <HiOutlineLockClosed className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: false,
  },
];
