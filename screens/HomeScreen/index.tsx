import {useNavigation, useRoute} from "@react-navigation/core";
import {AlarmType} from "../../types";

import React, {useState, useEffect, useContext, useRef} from "react";

import AlarmInfo from "../../components/AlarmInfo";
import {
  NoDataContainer,
  NoDataIcon,
  NoDataText,
  ContainerData,
  Loading,
} from "./styles";
import api from "../../services/api";

import FloatButton from "../../components/FloatButton";
import DeleteAlarms from "../../components/DeleteAlarms";
import firebase from "../../config/firebaseConfig";
import {Alert, RefreshControl, View} from "react-native";
import ContextUid from "../../context/ContextUserUid";
import ContextIsDeleting from "../../context/ContextIsDeleting";
import useTranslateY from "../../Animations/useTranslateY";

export default function Home() {
  const {isDeleting, changeIsDeleting} = useContext(ContextIsDeleting)!;
  const uid = useContext(ContextUid);

  const translateY = useTranslateY();
  const navigation = useNavigation();
  const params = useRoute().params as AlarmType;

  const [alarms, setAlarms] = useState<AlarmType[]>([]);
  const [listOfAlarmsToDelete, setListOfAlarmsToDelete] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchData = async () => {
    firebase.auth().onAuthStateChanged(async (user)=>{
      if (user) {
        try {
          const response = await api.post("/alarms/show", {
            uid: user.uid,
          });
          setAlarms(response.data);
          setIsLoading(false);
          setRefreshing(false);
        } catch (error) {
          Alert.alert(error.message, "Houve algum erro ao tentar conexão com o servidor.");
        }
      }
    });
  };

  const mountedRef = useRef(true);
  useEffect(() => {
    setIsLoading(true);
    fetchData();
    return () => {
      mountedRef.current = false;
      setIsLoading(false);
    };
  }, []);

  useEffect(()=>{
    if (!params) return;

    const newAlarms = alarms;
    alarms.push(params);

    setAlarms(newAlarms);
  }, [params]);

  const AddButtonPressed = () => {
    navigation.navigate("AddAlarmScreen");
  };

  const deleteListOfAlarms = () =>{
    try {
      if (listOfAlarmsToDelete.length) {
        const newAlarms = alarms;

        for (let i = 0; i < listOfAlarmsToDelete.length; i++) {
          const idToDelete = listOfAlarmsToDelete[i];

          for (let index = 0; index < alarms.length; index++) {
            const alarm = alarms[index];

            if (idToDelete == alarm?.id) {
              newAlarms.splice(index, 1);
              break;
            }
          }
        }
        setAlarms(newAlarms);
      };

      api.delete("/alarms", {
        data: {
          uid,
          ids: listOfAlarmsToDelete,
        },
      });

      setListOfAlarmsToDelete([]);
      changeIsDeleting(false);
    } catch (error) {
      Alert.alert(error.message, "Houve algum erro ao tentar conexão com o servidor.");
    }
  };

  const setIdToDelete = (newId:string, selectAllIds?:boolean) => {
    let ids:string[] = [];

    if (selectAllIds == true) {
      alarms.map(({id}, index)=>{
        ids[index] = id;
      });

      setListOfAlarmsToDelete(ids);
      return;
    }
    if (selectAllIds == false) {
      ids = [];

      setListOfAlarmsToDelete(ids);
      return;
    }

    if (listOfAlarmsToDelete?.includes(newId)) {
      ids = listOfAlarmsToDelete.filter((value)=>{
        return value != newId;
      });
    } else {
      ids = listOfAlarmsToDelete;
      ids.push(newId);
    }
    setListOfAlarmsToDelete(ids);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchData();
  }, []);

  if (alarms?.length == 0) {
    return (
      <NoDataContainer>
        <NoDataIcon />
        {
          isLoading ?
            <Loading size="large" color="#2274A1" /> :
            <NoDataText>
              Não há nenhum alarme aqui.
              Clique em “Add” para adicionar!
            </NoDataText>
        }
        <FloatButton onPress={AddButtonPressed} />

      </NoDataContainer>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <ContainerData
          style={{
            transform: [{
              translateY: translateY,
            }],
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {
            alarms?.map((alarmData, index) => (
              <View style={{
                marginBottom: index==(alarms.length-1) ? 30 : 0,
                marginTop: index== 0 ? 10 : 0,
              }}
              key={alarmData.id}
              >
                <AlarmInfo
                  enabled={alarmData.enabled}
                  time={alarmData.time}
                  name={alarmData.name}
                  repeted={alarmData.repeted}
                  id={alarmData.id}
                  setListOfAlarmsToDelete={setIdToDelete}
                />
              </View>
            ))}
        </ContainerData>

        <DeleteAlarms deleteListOfAlarms={deleteListOfAlarms}/>
        {
          !isDeleting && <FloatButton onPress={AddButtonPressed} />
        }
      </View>
    );
  }
}
