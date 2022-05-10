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
} from "native-base";

// Components
import AddPersonTransactionModal from "./AddPersonTransactionModal";
import AddPersonModal from "./AddPersonModal";
import DeletePersonModal from "./DeletePersonModal";

// Contexts
import { PreferencesContext, PeopleContext } from "../../Contexts";

// Types
import { Person } from "../../types";

// Utils
import { makeCurrencyFormat } from "../../utils";
import { LANGUAGES } from "../../statics";

const BalanceTransactionsList: React.FC = () => {
  const { people, addPerson, deletePerson, addTransaction } =
    React.useContext(PeopleContext);
  const { appLanguage } = React.useContext(PreferencesContext);
  const [showAddPerson, setShowAddPerson] = React.useState(false);
  const [showDeletePerson, setShowDeletePerson] = React.useState(false);
  const [currentPerson, setCurrentPerson] = React.useState<Person | null>(null);

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
    addPerson(personName);
    setShowAddPerson(false);
  };

  const handleDelete = (personName: string) => {
    const person = people.find((person) => person.name === personName);
    if (person) {
      deletePerson(person.id);
    }
    setShowDeletePerson(false);
  };

  const handleTransaction = (
    person: Person,
    amount: string,
    whoPays: string
  ) => {
    if (person) {
      addTransaction(person.id, parseInt(amount, 10), whoPays);
    }
    setCurrentPerson(null);
  };

  return (
    <>
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
