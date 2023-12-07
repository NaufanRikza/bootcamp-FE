import { Box, Button, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useState } from "react";
import { changeDefaultAddress } from "../../../api/address";
import { fetchAddressList } from "../../../app/redux/slice/AddressList/addressListSlice";

export default function AddressButton() {
  const addressListState = useSelector((state: RootState) => state.addressList);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const handleSave = async () => {
    try {
      setIsLoading(true);
      await changeDefaultAddress(1, addressListState.selectedAddressId!);
      setIsLoading(false);
      dispatch(fetchAddressList(1));
      toast({
        title: "Berhasil",
        description: "Alamat berhasil diubah",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.response.data.message ?? "Terjadi Kesalahan",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box
      position={"absolute"}
      bottom={0}
      padding={"10px"}
      width={"450px"}
      maxW={"calc(100vw - 50px)"}
      bgColor={"white"}
    >
      <Button
        width={"100%"}
        onClick={handleSave}
        bgColor={"primaryColor"}
        color={"gray.100"}
        _hover={{ color: "gray.800" }}
        isDisabled={addressListState.selectedAddressId === undefined}
        isLoading={isLoading}
      >
        Pilih Alamat
      </Button>
    </Box>
  );
}