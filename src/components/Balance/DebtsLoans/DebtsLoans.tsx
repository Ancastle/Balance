import React from "react";
import {
  SectionList,
  Heading,
  Center,
  Pressable,
  Flex,
  Box,
  Text,
  Button,
  useToast,
} from "native-base";

// Components
import AddPersonTransactionModal from "./AddPersonTransactionModal";
import AddPersonModal from "./AddPersonModal";
import DeletePersonModal from "./DeletePersonModal";
import HelperToastIcon from "../../Shared/HelperToastIcon";

// Types
import { Person, UuId } from "../../types";

// Utils
import { makeCurrencyFormat } from "../../utils";
import { LANGUAGES } from "../../statics";

// Store
import {
  selectPreferencesLanguage,
  selectPeopleData,
  addPerson,
  deletePerson,
  addPersonTransaction,
  useAppSelector,
  useAppDispatch,
  addHistoryRegister,
} from "../../../store";

const BalanceTransactionsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const people = useAppSelector(selectPeopleData);
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [showAddPerson, setShowAddPerson] = React.useState(false);
  const [showDeletePerson, setShowDeletePerson] = React.useState(false);
  const [currentPerson, setCurrentPerson] = React.useState<Person | null>(null);

  const toast = useToast();

  const onAddPerson = React.useCallback(
    (personName: string) => {
      dispatch(addPerson(personName));
      dispatch(
        addHistoryRegister(LANGUAGES.addPerson[appLanguage], personName)
      );
    },
    [dispatch, addPerson, addHistoryRegister]
  );
  const onDeletePerson = React.useCallback(
    (personId: UuId, personName: string) => {
      dispatch(deletePerson(personId));
      dispatch(
        addHistoryRegister(LANGUAGES.deletePerson[appLanguage], personName)
      );
    },
    [dispatch, deletePerson, addHistoryRegister]
  );
  const onAddTransaction = React.useCallback(
    (
      personId: UuId,
      personName: string,
      value: number,
      whoPays: string,
      reason: string
    ) => {
      dispatch(
        addPersonTransaction(
          personId,
          value,
          whoPays,
          reason || LANGUAGES.unnamed[appLanguage]
        )
      );
      dispatch(
        addHistoryRegister(
          LANGUAGES.addPersonTransaction[appLanguage],
          personName
        )
      );
    },
    [dispatch, addPersonTransaction, addHistoryRegister]
  );

  const data = React.useMemo(
    () => [
      {
        title: LANGUAGES.balance.tabs.debtsLoans.tabLabel[appLanguage],
        data: people,
      },
    ],
    [appLanguage, people]
  );

  const handleAdd = (personName: string) => {
    onAddPerson(personName);
    setShowAddPerson(false);
  };

  const handleDelete = (personName: string) => {
    const person = people.find((person) => person.name === personName);
    if (person) {
      onDeletePerson(person.id, person.name);
    }
    setShowDeletePerson(false);
  };

  const handleTransaction = (
    person: Person,
    amount: string,
    whoPays: string,
    reason: string
  ) => {
    if (person) {
      onAddTransaction(
        person.id,
        person.name,
        parseInt(amount, 10),
        whoPays,
        reason
      );
    }
    setCurrentPerson(null);
  };

  return (
    <>
      <HelperToastIcon
        styles={{ position: "absolute", left: 330, top: 14, zIndex: 99 }}
        onPress={() => {
          if (!toast.isActive("homeScreenHelper")) {
            toast.show({
              id: "homeScreenHelper",
              description: LANGUAGES.helpers.debtLoan[appLanguage],
              placement: "top",
              duration: 8000,
            });
          }
        }}
      />
      <SectionList
        mb="4"
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <Box
            key={index}
            minW="64"
            bg={index % 2 === 0 ? "primary.500" : "primary.300"}
          >
            {
              <Pressable onPress={() => setCurrentPerson(item)}>
                <Flex direction="row" py={5}>
                  <Center flex={1}>
                    <Text numberOfLines={1} fontSize={20}>
                      {item.name}
                    </Text>
                  </Center>
                  <Center flex={1}>
                    <Text numberOfLines={1} fontSize={20}>
                      {makeCurrencyFormat(parseInt(item.value, 10))}
                    </Text>
                  </Center>
                </Flex>
              </Pressable>
            }
          </Box>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Center>
            <Heading fontSize="xl" mt="3" pb="4">
              {title}
            </Heading>
          </Center>
        )}
      />
      <Center>
        <Button
          bg="primary.900"
          bottom={5}
          width="350"
          height="50"
          onPress={() => setShowAddPerson(true)}
        >
          {LANGUAGES.balance.tabs.debtsLoans.addPersonButton[appLanguage]}
        </Button>
        <Button
          bg="primary.900"
          bottom={5}
          mt={2}
          width="350"
          height="50"
          onPress={() => setShowDeletePerson(true)}
        >
          {LANGUAGES.balance.tabs.debtsLoans.removePerson[appLanguage]}
        </Button>
        {currentPerson && (
          <AddPersonTransactionModal
            isOpen={!!currentPerson}
            onClose={() => setCurrentPerson(null)}
            onTransaction={handleTransaction}
            person={currentPerson}
          />
        )}
        {showAddPerson && (
          <AddPersonModal
            isOpen={showAddPerson}
            onClose={() => setShowAddPerson(false)}
            onAdd={handleAdd}
            people={people}
          />
        )}
        {showDeletePerson && (
          <DeletePersonModal
            isOpen={showDeletePerson}
            onClose={() => setShowDeletePerson(false)}
            onDelete={handleDelete}
            people={people}
          />
        )}
      </Center>
    </>
  );
};

export default BalanceTransactionsList;
