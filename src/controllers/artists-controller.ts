import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import ArtistModel from '../models/artist-model';

export const getArtists: RequestHandler = async (req, res) => {
  const artists = await ArtistModel.find();

  res.status(200).json(artists);
};

export const getArtist: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const artist = await ArtistModel.findById(id);
    res.status(200).json(artist);
  } catch (error) {
    res.status(404).json({
      error: `Artist with id ${id} was not found`,
    });
  }
};

export const createArtist: RequestHandler = async (req, res) => {
  const artistProps = req.body;
  try {
    const createdArtist = await ArtistModel.create(artistProps);
    res.status(201).json(createdArtist);
  } catch (error) {
    const err = error instanceof Error.ValidationError ? error.message : 'Server error';
    res.status(400).json({ err });
  }
};

export const updateArtist: RequestHandler = async (req, res) => {
  const artistProps = req.body;
  const { id } = req.params;

  try {
    const updatedArtist = await ArtistModel.findByIdAndUpdate(id, artistProps);
    res.status(200).json(updatedArtist);
  } catch (error) {
    res.status(404).json({
      error: 'Artist couldn\'t be updated',
    });
  }
};
