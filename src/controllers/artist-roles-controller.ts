import { RequestHandler } from 'express';
import ArtistRoleModel from '../models/artist-role-model';

export const getArtistRoles: RequestHandler = async (req, res) => {
  const artistRoles = await ArtistRoleModel.find();

  res.status(200).json(artistRoles);
};

export const getArtistRole: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const artistRole = await ArtistRoleModel.findById(id);
    res.status(200).json(artistRole);
  } catch (error) {
    res.status(404).json({
      error: `Artist role with id ${id} was not found`,
    });
  }
};

export const createArtistRole: RequestHandler = async (req, res) => {
  const artistRoleProps = req.body;
  try {
    const createdArtistRole = await ArtistRoleModel.create(artistRoleProps);
    res.status(201).json(createdArtistRole);
  } catch (error) {
    res.status(400).json({
      error: 'Couldn\'t create a new artist role',
    });
  }
};
