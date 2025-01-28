import { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface KendaraanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: KendaraanData) => void;
  initialData?: KendaraanData;
}

interface KendaraanData {
  id?: number;
  kode_kendaraan: string;
  nama_kendaraan: string;
  jenis_kendaraan: string;
  merk: string;
  warna: string;
  nomor_polisi: string;
  nomor_mesin: string;
  nomor_chasis: string;
}

const KendaraanModal: React.FC<KendaraanModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<KendaraanData>(
    initialData || {
      kode_kendaraan: "",
      nama_kendaraan: "",
      jenis_kendaraan: "",
      merk: "",
      warna: "",
      nomor_polisi: "",
      nomor_mesin: "",
      nomor_chasis: "",
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Kendaraan" : "Tambah Kendaraan"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="kode_kendaraan">Kode Kendaraan</Label>
            <Input
              id="kode_kendaraan"
              name="kode_kendaraan"
              value={formData.kode_kendaraan}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="nama_kendaraan">Nama Kendaraan</Label>
            <Input
              id="nama_kendaraan"
              name="nama_kendaraan"
              value={formData.nama_kendaraan}
              onChange={handleChange}
            />
          </div>
          {/* Tambahkan input lainnya untuk jenis, merk, warna, nomor_polisi, nomor_mesin, nomor_chasis */}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default KendaraanModal;
