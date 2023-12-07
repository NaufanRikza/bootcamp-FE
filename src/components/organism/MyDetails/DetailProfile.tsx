import { Center, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IErrorResponse,
  IUser,
  fetchUserById_,
} from "../../../app/redux/slice/User/user";
import { AppDispatch, RootState } from "../../../app/redux/store";
import FailedLoadContent from "../../molecules/FailedLoadContent";
import LoadingCenter from "../../molecules/Loading";
import SubProfileInfo from "../../molecules/MyDetails/SubProfileInfo";

export default function DetailProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const user2 = useSelector((state: RootState) => state.user2);
  const user = user2.user as IUser;
  const errorUser = user2.user as IErrorResponse;
  useEffect(() => {
    dispatch(fetchUserById_(1));
  }, [dispatch]);

  if (user2.status === "pending" || user2.status === "idle")
    return <LoadingCenter />;
  if (user2.status === "rejected") return <FailedLoadContent />;
  if (errorUser?.status === 404)
    return (
      <Center>
        <Text>404</Text>
      </Center>
    );
  return (
    <VStack>
      {!user?.isVerified && (
        <Text color='red.500'>Akun belum diverifikasi</Text>
      )}
      <SubProfileInfo
        label={"Nama Lengkap"}
        value={user?.name ?? ""}
        field='name'
      />
      <SubProfileInfo label={"Email"} value={user?.email ?? ""} field='email' />
      <SubProfileInfo
        label={"Nomor Handphone"}
        value={user?.phoneNumber ?? ""}
        field='phoneNumber'
      />
      <SubProfileInfo
        label={"Tanggal Lahir"}
        value={user?.birthdate ?? "Belum diisi"}
        field='birthdate'
      />

      <SubProfileInfo
        field='refferalCode'
        label={"Refferal Code"}
        value={user?.referralCode ?? "Belum diisi"}
        copyIcon={true}
      />
    </VStack>
  );
}