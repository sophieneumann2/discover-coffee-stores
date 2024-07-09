import { AirtableRecordType, CoffeeStoreType } from '@/types';

const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  'appm1oSR6EEfsAw3U',
);

const table = base('coffee-stores');

const getMinifiedRecords = (records: AirtableRecordType[]) =>
  records.map((record: AirtableRecordType) => {
    return { recordId: record.id, ...record.fields };
  });

export const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();

  return getMinifiedRecords(findRecords);
};

export const createCoffeeStore = async (
  coffeeStore: CoffeeStoreType,
  id: string,
) => {
  const { name, address, voting = 0, imgUrl } = coffeeStore;
  try {
    if (id) {
      const records = await findRecordByFilter(id);

      if (!records.length) {
        const createRecords = await table.create([
          {
            fields: { id, name, address, voting, imgUrl },
          },
        ]);
        return getMinifiedRecords(createRecords);
      } else {
        return records;
      }
    } else {
      console.error('Store id is missing');
    }
  } catch (error) {
    console.error('error creating or finding a store');
  }
};

export const updateCoffeeStore = async (id: string) => {
  try {
    if (id) {
      const records = await findRecordByFilter(id);

      if (records.length) {
        const record = records[0];
        const updatedVoting = record.voting + 1;

        const updatedRecords = await table.update([
          {
            id: record.recordId,
            fields: { voting: updatedVoting },
          },
        ]);
        return getMinifiedRecords(updatedRecords);
      } else {
        console.error('coffee store does not exist');
      }
    } else {
      console.error('Store id is missing');
    }
  } catch (error) {
    console.error('error updating a store');
  }
};
