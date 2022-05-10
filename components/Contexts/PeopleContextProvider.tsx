import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

// Types
import { Person, UuId } from "../types";

// Statics
import { STORAGE } from "../statics";

export interface PeopleContextProps {
  people: Person[];
  addPerson: (personName: string) => void;
  editPerson: (newPersonName: string, personId: UuId) => void;
  deletePerson: (personId: UuId) => void;
  addTransaction: (personId: UuId, value: number, whoPays: string) => void;
}

const PeopleContext = React.createContext<PeopleContextProps>({
  people: [],
  addPerson: () => "addPerson",
  editPerson: () => "editPerson",
  deletePerson: () => "deletePerson",
  addTransaction: () => "addTransaction",
});

const PeopleContextProvider: React.FC = ({ children }) => {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [hasFetchedPeople, setHasFetchedPeople] = React.useState(false);

  const fetchPeople = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.people);
      if (value === null) {
        setPeople([]);
        const jsonValue = JSON.stringify({ people: [] });
        await AsyncStorage.setItem(STORAGE.people, jsonValue);
      } else {
        const parsed = JSON.parse(value);
        setPeople(parsed.people);
      }
      setHasFetchedPeople(true);
    } catch (e) {
      console.log("Error: Could not fetch from people data");
    }
  }, []);

  const addPerson = React.useCallback(
    async (personName: string) => {
      try {
        const newPeople = [
          ...people,
          {
            name: personName,
            id: uuid.v4(),
            value: "0",
          },
        ];
        setPeople((prevState) => [
          ...prevState,
          {
            name: personName,
            id: uuid.v4(),
            value: "0",
          },
        ]);
        const jsonValue = JSON.stringify({ people: newPeople });
        await AsyncStorage.setItem(STORAGE.people, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to people data");
      }
    },
    [people]
  );

  const editPerson = React.useCallback(
    async (newPersonName: string, personId: UuId) => {
      try {
        const newPeople = people.map((person) => {
          if (person.id === personId) {
            return { ...person, name: newPersonName };
          } else {
            return person;
          }
        });
        setPeople(newPeople);
        const jsonValue = JSON.stringify({ people: newPeople });
        await AsyncStorage.setItem(STORAGE.people, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to people data");
      }
    },
    [people]
  );

  const deletePerson = React.useCallback(
    async (personId: UuId) => {
      try {
        const newPeople = people.filter((person) => person.id !== personId);
        setPeople(newPeople);
        const jsonValue = JSON.stringify({ people: newPeople });
        await AsyncStorage.setItem(STORAGE.people, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to people data");
      }
    },
    [people]
  );

  const addTransaction = React.useCallback(
    async (personId: UuId, value: number, whoPays: string) => {
      try {
        const newPeople = people.map((person) =>
          person.id === personId
            ? {
                ...person,
                value:
                  whoPays === "me"
                    ? (parseInt(person.value, 10) + value).toString()
                    : (parseInt(person.value, 10) - value).toString(),
              }
            : person
        );
        setPeople(newPeople);
        const jsonValue = JSON.stringify({ people: newPeople });
        await AsyncStorage.setItem(STORAGE.people, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to people data");
      }
    },
    [people]
  );

  React.useEffect(() => {
    if (!hasFetchedPeople) {
      fetchPeople();
    }
  }, []);

  return (
    <PeopleContext.Provider
      value={{
        people,
        addPerson,
        editPerson,
        deletePerson,
        addTransaction,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export { PeopleContextProvider, PeopleContext };
