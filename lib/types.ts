export declare type Category = {
  id: number;
  nom: string;
  description: string;
};

export declare type Planning = {
  id: number;
  heuredebut: string;
  heurefin: string;
  date: string;
  direct: boolean;
  programmeid: number; // Foreign key to Programme
  programmenom?: string;
};

export declare type Programme = {
  id: number;
  titre: string;
  duree: string;
  description: string;
  categorieid: number; // Foreign key to Category
  categorienom?: string; // Foreign key to Category
};

export declare type Presentateur = {
  id: number;
  nom: string;
  genre: string;
  bibliographie: string;
};

export declare type Animation = {
  id?: number;
  programmeid: number; // Foreign key to Programme
  programmenom?: string; // Foreign key to Programme
  presentateurnom?: string; // Foreign key to Presentateur
  presentateurid: number; // Foreign key to Presentateur
  role: string;
};

export declare type Commentaire = {
  id: number;
  description: string;
  datepub: string;
  programmeid: number; // Foreign key to Programme
  abonneid: number; // Foreign key to Abonne
};

export declare type Abonne = {
  id: number;
  nom: string;
  email: string;
  datenais?: string;
  genre?: string;
  etatcivil?: string;
  password: string;
};

export declare type User = {
  id: number;
  nom: string;
  email: string;
  password: string;
};
